import { useState } from "react"
import { Popover, Text, Button, Image } from "@mantine/core"
import { LayersIcon, MixerVerticalIcon } from "@radix-ui/react-icons"

interface PopoverWrapperProps {
  children: any
  variant: "params" | "names"
}
const PopoverWrapper: React.FC<PopoverWrapperProps> = ({
  children,
  variant,
}) => {
  const [opened, setOpened] = useState(false)

  const toggleOpened = () => setOpened(o => !o)

  const iconSize = { width: 30, height: 30 }

  const icon = {
    params: <MixerVerticalIcon {...iconSize} />,
    names: <LayersIcon {...iconSize} />,
  }[variant]

  return (
    <Popover
      opened={opened}
      onClose={toggleOpened}
      position="bottom"
      placement="end"
      radius="lg"
      target={
        <Button variant="subtle" onClick={toggleOpened}>
          {icon}
        </Button>
      }
    >
      {children}
    </Popover>
  )
}
export default PopoverWrapper
