import logo from "../assets/img/logo.png";

export default function LoginCard() {
  return (
    
      <div className="w-[480px] bg-white rounded-4xl p-10 shadow-sm">
        <div className="flex justify-center mb-8">
        <img
          src={logo}
          alt="Meetly"
          className="h-20 object-contain"
        />
         </div>

        <h2 className=" font-primary text-center text-3xl font-bold text-primary">
            Bienvenido de nuevo
        </h2>

         <p className="text-center font-primary font-semibold text-primary mt-2">
          Ingresa tus credenciales
            </p>


      <div className="mt-8">
       
        <label className="block mb-2 font-secondary  text-primary font-semibold">
          CORREO ELECTRÓNICO
        </label>

        <input

             type="email"
            placeholder="nombre@leyder.com"
          className="w-full bg-soft rounded-xl p-4"
        />
      </div>

      <div className="mt-6">
        <label className=" font-secondary block mb-4 text-primary font-semibold">
          CONTRASEÑA
        </label>
        

         <input
        type="password"
          placeholder= "********"
          className="w-full bg-soft rounded-xl p-4"
        />
       </div>


         <div className="flex justify-between mt-4 text-sm">
          <label>
           <input type="checkbox" />
            <span className="ml-2">Recordarme</span>
         </label>

        

         <a href="#">
          ¿Olvidaste tu contraseña?
         </a>
       </div>

        <button
          className="w-full mt-8 py-4 rounded-xl text-white font-bold bg-accent"
       >
        Iniciar Sesión
         </button>
        </div>
  );
}