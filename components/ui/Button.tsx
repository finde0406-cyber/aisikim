// 공통 버튼 컴포넌트 - Link와 button 두 가지 형태 지원
import Link from 'next/link'

interface ButtonProps {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  onClick?: () => void
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-semibold min-h-[52px] transition-colors'
  const variants = {
    primary: 'bg-indigo-600 text-white active:bg-indigo-700',
    outline: 'border-2 border-indigo-600 text-indigo-600 active:bg-indigo-50',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
