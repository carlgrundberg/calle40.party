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
      <p className="my-2">
        Vi ses hemma i vår trädgård på Snapphanevägen 29 i Vittsjö, där vi äter
        och dricker gott. Kom när ni vill från kl 16:00, hela familjen är
        välkomna!
      </p>
      <p className="my-2">
        Jag uppskattar lokalt producerade ätbara produkter och drycker, men i
        övrigt så önskar jag att ni skänker en slant till{' '}
        <a
          className="underline"
          href="https://www.radiohjalpen.se/"
          target="_blank"
        >
          Radiohjälpen
        </a>
        .
      </p>
      <p className="my-2">
        Vill ni sova över finns värdshuset{' '}
        <a className="underline" href="https://furuliden.se/" target="_blank">
          Furuliden
        </a>
        ,{' '}
        <a
          className="underline"
          href="https://www.vittsjocamping.se/"
          target="_blank"
        >
          Vittsjö Camping
        </a>{' '}
        och{' '}
        <a
          className="underline"
          href="https://www.wittsjogk.se/"
          target="_blank"
        >
          Wittsjö Golfklubb
        </a>{' '}
        som alternativ.
      </p>
      <p className="my-2">
        Fyll i formuläret nedan senast den 1 juli för att anmäla dig. Mer
        information kommer när det närmar sig.
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
