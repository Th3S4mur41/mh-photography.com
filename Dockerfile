
# Use an official Python runtime as a parent image
FROM php:7.2-apache

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libwebp-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-webp-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install -j$(nproc) exif
#    docker-php-ext-enable exif

# Copy custom php configuration
#COPY config/php.ini /usr/local/etc/php/

# Copy the build directory contents into the container at /var/www/html/ (apache default root)
#COPY dist/ /var/www/html/

# Make port 80 available to the world outside this container
EXPOSE 80
