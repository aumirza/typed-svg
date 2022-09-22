type Props = {
    label: string,
    children: React.ReactNode,
}

export const InputGroup: React.FC<Props> = ({ label, children }) => (
    <div className="flex items-center justify-between my-1">
        <label className="text-white" htmlFor="">{label}</label>
        {children}
    </div>
)