import { useAppContext } from "@/components/AppContext"
import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Status = () => {
  const {
    state: { session },
    setSession,
  } = useAppContext()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const handleClick = () => {
    localStorage.removeItem("session_jwt")
    setSession()
    router.reload()
  }

  useEffect(() => {
    if (!session) {
      return
    }

    setUser(session.user)
  }, [session])

  return (
    <div className="flex">
      {user ? (
        <>
          <button className="mr-2 my-auto text-white">
            <Link href={`/users/${user.id}`}>{user.displayName}</Link>
          </button>
          <button onClick={handleClick}>
            <ArrowLeftOnRectangleIcon className="text-white w-6 h-6 mr-3" />
          </button>
        </>
      ) : (
        <button className="text-3xl">
          <Link href="/users/sign-up">
            <UserIcon className="m-2 w-6 h-6 mt-5 text-white" />
          </Link>
        </button>
      )}
    </div>
  )
}

export default Status
