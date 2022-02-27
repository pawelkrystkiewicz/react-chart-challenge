import { Accordion, Alert } from "@mantine/core"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface ErrorInfoProps {
  message?: string
  details?: string
}

const ErrorInfo: React.FC<ErrorInfoProps> = ({
  message = "An error occurred. Please try again.",
  details,
}) => {
  return (
    <Alert
      icon={<ExclamationTriangleIcon />}
      title={"Error"}
      color="red"
      radius="md"
      variant="outline"
    >
      {message}
      {details && (
        <Accordion iconSize={14}>
          <Accordion.Item label="Error details">{details}</Accordion.Item>
        </Accordion>
      )}
    </Alert>
  )
}

export default ErrorInfo
