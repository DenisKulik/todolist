import styles from './Button.module.scss';
import { FilterType } from '../../App';

type ButtonPropsType = {
    name: string
    callback: () => void
    filter?: FilterType
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