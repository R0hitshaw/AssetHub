package com.asset.tracker.it_asset_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity(prePostEnabled = true)
@EnableCaching
public class ItAssetManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItAssetManagementApplication.class, args);

	}

}
