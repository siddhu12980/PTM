export default function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-5 w-5 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-xm text-gray-900"
        >
          Remember me
        </label>
      </div>

      <div className="">
        <a
          href="#"
          className=" text-xm font-semibold text-slate-600 hover:text-slate-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
}
