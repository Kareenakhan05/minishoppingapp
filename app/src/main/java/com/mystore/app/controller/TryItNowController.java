package com.mystore.app.controller;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class TryItNowController {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/process_images")
    public ResponseEntity<Map<String, String>> processImages(
            @RequestParam("userImage") MultipartFile userImage,
            @RequestParam("productImageUrl") String productImageUrl) {
        Map<String, String> response = new HashMap<>();
        try {
            // Save the user image
            String userImagePath = saveFile(userImage);

            // Save the product image locally or get its path if it's already stored
            String productImagePath = saveProductImage(productImageUrl);

            // Process the images
            String resultImagePath = processImages(userImagePath, productImagePath);

            // Generate the URL for the processed image
            String resultImageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(resultImagePath)
                    .toUriString();

            // Populate response with the result image URL
            response.put("resultImageUrl", resultImageUrl);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Error processing images: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    private String saveProductImage(String productImageUrl) throws IOException {
        Path productImagePath = Paths.get(UPLOAD_DIR).resolve(new File(productImageUrl).getName());
        if (Files.notExists(productImagePath)) {
            try (InputStream in = new URL(productImageUrl).openStream()) {
                Files.copy(in, productImagePath, StandardCopyOption.REPLACE_EXISTING);
            }
        }
        return productImagePath.getFileName().toString();
    }

    private String processImages(String userImagePath, String productImagePath) throws IOException {
        BufferedImage userImage = ImageIO.read(new File(UPLOAD_DIR + userImagePath));
        BufferedImage productImage = ImageIO.read(new File(UPLOAD_DIR + productImagePath));

        if (userImage == null || productImage == null) {
            throw new IOException("Error reading one of the images.");
        }

        BufferedImage resultImage = overlayImages(userImage, productImage);

        String resultImageName = "processed_" + System.currentTimeMillis() + ".jpg";
        File resultImageFile = new File(UPLOAD_DIR + resultImageName);
        ImageIO.write(resultImage, "jpg", resultImageFile);

        return resultImageName;
    }

    private BufferedImage overlayImages(BufferedImage userImage, BufferedImage productImage) {
        int userWidth = userImage.getWidth();
        int userHeight = userImage.getHeight();

        BufferedImage resizedProductImage = resizeImage(productImage, userWidth / 3, userHeight / 3);

        BufferedImage resultImage = new BufferedImage(userWidth, userHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resultImage.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.drawImage(userImage, 0, 0, null);

        int productWidth = resizedProductImage.getWidth();
        int productHeight = resizedProductImage.getHeight();
        int x = (userWidth - productWidth) / 2;
        int y = (userHeight - productHeight) / 2;
        g2d.drawImage(resizedProductImage, x, y, null);
        g2d.dispose();

        return resultImage;
    }

    private BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g2d.dispose();
        return resizedImage;
    }
}
