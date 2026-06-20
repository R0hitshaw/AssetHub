#!/bin/bash
docker run -p 8080:8080 \
-e JWT_SECRET=p9VtY0RzRk1xS2pXc0R3R2xWZk1nN2p2cVZrR1l6b3JZb0I= \       
-e SPRING_DATASOURCE_USERNAME=root \                                                                                                                                                
-e SPRING_DATASOURCE_PASSWPRD=8617581470 \                                                                                                                                          
asset-management-app
