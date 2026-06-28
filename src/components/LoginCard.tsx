import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { useAuth } from '../context/authContext';
import logo from '../assets/img/logo.png';

interface Props {
  onLogin: () => void;
}

export default function LoginCard({ onLogin }: Props) {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setServerError(null);
    try {
      await login(data);
      onLogin();
    } catch (err: unknown) {
      // Muestra el mensaje de error que manda tu backend
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setServerError(axiosErr.response?.data?.message ?? 'Credenciales incorrectas');
      } else {
        setServerError('Error al conectar con el servidor');
      }
    }
  }

  return (
    <div className="w-[480px] bg-white rounded-4xl p-10 shadow-sm">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Meetly" className="h-20 object-contain" />
      </div>

      <h2 className="font-primary text-center text-3xl font-bold text-primary">
        Bienvenido de nuevo
      </h2>
      <p className="text-center font-primary font-semibold text-primary mt-2">
        Ingresa tus credenciales
      </p>

      {/* Error del servidor */}
      {serverError && (
        <p className="mt-4 text-center text-sm text-red-500 font-secondary bg-red-50 rounded-xl py-2 px-4">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mt-8">
          <label className="block mb-2 font-secondary text-primary font-semibold">
            CORREO ELECTRÓNICO
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="nombre@Kesitouwu.com"
            className="w-full bg-soft rounded-xl p-4"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mt-6">
          <label className="font-secondary block mb-4 text-primary font-semibold">
            CONTRASEÑA
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder="********"
            className="w-full bg-soft rounded-xl p-4"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Recordarme + olvidaste */}
        <div className="flex justify-between mt-4 text-sm">
          <label>
            <input type="checkbox" />
            <span className="ml-2">Recordarme</span>
          </label>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 py-4 rounded-xl text-white font-bold bg-accent disabled:opacity-60"
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

