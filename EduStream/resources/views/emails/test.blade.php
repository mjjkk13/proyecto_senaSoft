@component('mail::message')
# ¡Hola!

Este es un correo de prueba enviado desde EduStream.

@component('mail::button', ['url' => config('app.url')])
Ir a la app
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent
