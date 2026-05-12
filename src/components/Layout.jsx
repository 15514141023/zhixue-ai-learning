import { NavLink } from "react-router-dom"

function Layout({ children }) {
  const menus = [
    { path: '/Chat', name: 'AI学习助手' },
    { path: '/Knowledge', name: '知识库' },
    { path: '/Progress', name: '学习进度' },
    { path: '/Training', name: '练习' },
  ]

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">智学</h1>

        <nav className="space-y-2">
          {menus.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}

export default Layout