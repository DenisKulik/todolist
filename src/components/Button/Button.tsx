import styles from './Button.module.scss';
import { filterType } from '../../App';

type ButtonPropsType = {
    name: string
    callback: () => void
    filter?: filterType
}

const Button = (props: ButtonPropsType) => {
    const { name, callback, ...rest } = props;

    const onClickHandler = () => callback();
    return (
        <button
            className={ rest.filter === name ? styles.activeFilter : '' }
            onClick={ onClickHandler }>{ name }</button>
    );
};

export default Button;