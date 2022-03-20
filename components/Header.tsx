import Menu from 'components/Menu'

const Header = () => (
  <>
    <header className="header">
      <Menu />
    </header>
    <style jsx>{`
      .header {
        padding: 0.5rem;
      }
    `}</style>
  </>
)

export default Header
