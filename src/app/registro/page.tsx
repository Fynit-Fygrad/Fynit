
'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

    <!-- Card Container -->
    <div class="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 transition-all my-8">

        <!-- Header / Logo -->
        <div class="text-center mb-8">
            <a href="/" class="inline-flex items-center justify-center gap-2 mb-6">
                <img src="assets/logos%20svg/favicon.svg" alt="Fynit" class="h-9 w-auto">
            </a>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Crea tu cuenta en Fynit</h1>
            <p class="text-sm text-gray-500">Únete a miles de investigadores que optimizan sus publicaciones.</p>
        </div>

        <!-- Google Button -->
        <button type="button"
            class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors mb-6">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4" />
                <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853" />
                <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05" />
                <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335" />
            </svg>
            Registrarse con Google
        </button>

        <!-- Divider -->
        <div class="my-6 flex items-center">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="px-3 text-sm text-gray-400">o con tu correo</span>
            <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Formulario -->
        <form action="#" method="POST" class="space-y-4">

            <!-- Full Name -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
                <input type="text" id="name" name="name" placeholder="Ej. Ana García" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors">
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@universidad.edu" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors">
            </div>

            <!-- Password -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Mínimo 8 caracteres" required
                    minlength="8"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors">
            </div>

            <!-- Confirm Password -->
            <div>
                <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1.5">Confirmar
                    contraseña</label>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Repite tu contraseña"
                    required minlength="8"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors">
            </div>

            <!-- Terminos -->
            <div class="pt-1">
                <label class="flex items-start gap-3">
                    <input type="checkbox" required
                        class="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors cursor-pointer">
                    <span class="text-sm text-gray-500 leading-tight">
                        Acepto los <a href="#" class="text-brand-600 hover:underline">Términos de Servicio</a> y la <a
                            href="#" class="text-brand-600 hover:underline">Política de Privacidad</a> de Fynit.
                    </span>
                </label>
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-brand-500/30 transition-all hover:shadow-md hover:-translate-y-0.5 mt-4">
                Crear cuenta
            </button>
        </form>

        <!-- Footer link -->
        <p class="text-center text-sm text-gray-500 mt-8">
            ¿Ya tienes cuenta?
            <a href="javascript:void(0)" onclick="showComingSoon(event)" class="font-semibold text-brand-600 hover:text-brand-700 transition-colors">Inicia
                sesión aquí</a>
        </p>

    </div>
` }} />
  );
}
