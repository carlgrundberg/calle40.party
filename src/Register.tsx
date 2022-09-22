type InputProps = {
  name: string
  label: string
  type: string
  autoComplete?: string
  placeholder?: string
  defaultValue?: string
}

function Input({
  name,
  label,
  type,
  autoComplete,
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <label className="block mt-2">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        className="
          mt-1
          block
          w-full
          rounded-md
          text-gray-700
          border-gray-300
          shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
        "
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />
    </label>
  )
}

function encode(data: { [key: string]: string }) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

type RegisterProps = {
  onSuccess: () => void
}

function Register({ onSuccess }: RegisterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'register',
        ...Object.fromEntries(formData),
      }),
    })
      .then(onSuccess)
      .catch((error) => alert(error))

    e.preventDefault()
  }

  return (
    <>
      <h2 className="text-xl">Klädsel</h2>
      <p className="my-2">
        Jag skulle vilja återuppleva tiden för 40 år sedan vilket resulterar i
        att klädseln är givetvis något från 80-talet! (Valfri tolkning).
      </p>
      <p className="my-2">Mat och dryck serveras under kvällen!</p>
      <p className="my-2 text-xl">17 December kl. 18.00</p>
      <p className="my-2">
        Jag önskar mig inget i present men vill man ändå ge något kan man bidra
        med valfritt belopp till festkassan.
      </p>
      <p className="my-2">
        Vi ser fram emot en barnfri kväll, hoppas ni gör det samma 🥳
      </p>
      <p className="my-2">
        Fyll i formuläret nedan senast 30 oktober för att anmäla dig. Kan du/ni
        inte komma så ange 0 som antal.
      </p>
      <form
        className="w-full max-w-lg"
        data-netlify="true"
        method="POST"
        name="register"
        onSubmit={handleSubmit}
      >
        <Input name="Namn" label="Namn" type="text" autoComplete="name" />
        <Input name="Email" label="Email" type="email" autoComplete="email" />
        <Input name="Telefon" label="Telefon" type="tel" autoComplete="tel" />
        <Input name="Antal" label="Antal" type="number" defaultValue="1" />

        <button className="mt-4 py-2 px-4 bg-indigo-600 rounded" type="submit">
          Skicka
        </button>
      </form>
    </>
  )
}

export default Register
