# TET_2020_1_Project_1
Proyecto 1 tópicos especiales en telemática, realizado con vue, nodejs, express, mongo.

# Problemática

Se desea desallorar una aplicación web, que capture los datos de un sensor de temperatura y humedad, la aplicación debe hacer sus peticiones a una api REST que también debe ser implementado.

# Requisitos Funcionales

  1. La aplicación debe solicitar todos los datos que se necesiten a un api rest.
  2. El api rest debe permitir el registtro de usuarios.
  3. El api rest debe autenticar a los usuarios y devolver un token o key que le permita saber a la aplicación que el usuario se encuentra
  conectado.
  4. El usuario puede ver los datos de los sensores que tiene registrados con su Email.
  5. El api debe permitir añadir nuevos valores a cada sensor, por medio de solicitudes http, para ello se puede emplear una aplicación
  como postman.
 
# Requisitos no funcionales

  1. Las contraseñas deben ser seguras, no se pueden acceder a ellas o ser robadas, passport, jwt.
  
# Tecnología utilizada
 ## Backend
    En el backend se empleó express, mongoose, bcrypt, https.
    
 ## Frontend
    En el frontend se empleó vuejs.
    
# Serivios del api rest
## Post
     Con el método post se puede registar un usuario, loggearse, añadir nuevos sensores, añadir datos  un sensor.
## Get
     Con el método get se puede solicitar la lista de sensores, y usuarios.
     
# Dificultades
  Se presentaron varias dificultades para conectar el backend con el frontend. Esto debido al poco conocimiento sobre el uso del framework
  de vuejs.
