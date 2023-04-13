type ButtonPropsType = {
    name: string
    callback: () => void
}

const Button = (props: ButtonPropsType) => {
    const { name, callback } = props;

    const onClickHandler = () => callback();
    return (
        <button onClick={ onClickHandler }>{ name }</button>
    );
};

export default Button;