import NavBar from "../components/NavBar"

function ErrorPage() {
  return (
    <>
      <NavBar />
      <main>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </main>
    </>
  )
}

export default ErrorPage