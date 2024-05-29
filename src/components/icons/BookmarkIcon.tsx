const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.507 19.853V6.034a2.017 2.017 0 0 0-2-2.034h-8a2.017 2.017 0 0 0-2 2.034v13.819a1 1 0 0 0 1.6.913l3.8-3.281a.9.9 0 0 1 1.206 0l3.794 3.282a1 1 0 0 0 1.6-.914Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
