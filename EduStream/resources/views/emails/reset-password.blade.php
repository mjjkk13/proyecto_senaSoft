@component('mail::message')
# Restablecimiento de contraseña

Hola,

Recibiste este correo porque solicitaste restablecer tu contraseña en **EduStream**.

Haz clic en el siguiente botón para establecer una nueva contraseña:

@component('mail::button', ['url' => $resetUrl])
Restablecer contraseña
@endcomponent

Este enlace para restablecer tu contraseña expirará en 60 minutos.

Si no solicitaste este cambio, puedes ignorar este correo.

Gracias,<br>
El equipo de **EduStream**

@slot('subcopy')
© {{ date('Y') }} EduStream. Todos los derechos reservados.
@endslot
@endcomponent
