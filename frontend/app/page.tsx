const response = await fetch("http://localhost:8000");
const json = await response.json();
console.log(json);


export default function Page() {
  return (<h1>{json["user"]}</h1>)
}