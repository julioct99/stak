interface TransactionFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const TransactionForm: React.FunctionComponent<TransactionFormProps> = ({
  onSubmit,
  editMode,
}) => {
  return <h1>Transaction form</h1>
}

export default TransactionForm
