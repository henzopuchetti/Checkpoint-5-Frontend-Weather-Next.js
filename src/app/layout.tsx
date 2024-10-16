import { Menu } from '@/components/Menu/Menu'
import { UserContextProvider } from '@/context/UserContext'
import './globals.css'
import { StyledBody } from './layout.style'
export const metadata = {
  title: 'Cp 5 Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <StyledBody>
        <UserContextProvider>
          <main >{children}</main>
          <Menu />
        </UserContextProvider>
      </StyledBody>
    </html>
  )
}