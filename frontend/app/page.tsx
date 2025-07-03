const response = await fetch("http://localhost:8000/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: "loki0b"
  })
});

const message = await response.json();

export default function Page() {
  return (
    <h1>{message["message"]}</h1>
  )
}