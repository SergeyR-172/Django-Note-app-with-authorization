FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY auth.html /usr/share/nginx/html/auth.html
COPY js/ /usr/share/nginx/html/js/

EXPOSE 80