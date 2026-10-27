interface CampoTextoProps {
  id: string;
  etiqueta: string;
  tipo?: "text" | "email";
  valor: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (valor: string) => void;
}

function CampoTexto({
  id,
  etiqueta,
  tipo = "text",
  valor,
  placeholder,
  maxLength,
  onChange,
}: CampoTextoProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>

      <input
        id={id}
        type={tipo}
        className="form-control"
        value={valor}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default CampoTexto;