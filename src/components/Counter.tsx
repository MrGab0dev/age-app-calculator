import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  from: number
  to: number
}

const voidTag: string = '--'

export const Counter: React.FC<Props> = ({ from, to }) => {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest: number) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 0.9
    })
    return controls.stop
  }, [to])

  return <motion.p>{!to ? voidTag : rounded}</motion.p>
}
