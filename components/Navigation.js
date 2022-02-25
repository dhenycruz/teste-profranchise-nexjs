const Navigation = ({ userName }) => {
  return (
    <header>
      <nav>
        <div>
          <p>{ userName }</p>
        </div>
      </nav>
    </header>
  )
};

export default Navigation;