import classNames from 'classnames/bind';
import styles from './CartMenu.module.scss';
import Tippy from '@tippyjs/react/headless';
import CartItem from './CartItem';
import { CartPopper } from './CartPopper';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartMenu({ children, hideOnClick = false, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <CartItem key={index} data={item} />;
        });
    };

    const handleCalTotalPrice = (array) => {
        return array.reduce((acc, item) => acc + item['price'] * item['quantity'], 0);
    };

    const handleFormatPrice = (inputPrice) => {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(inputPrice);
        return formattedNumber;
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx('cart-list')} tabIndex="-1" {...attrs}>
                <CartPopper className={cx('menu-popper')}>
                    <div className={cx('total-count')}>{items.length} ITEMS</div>
                    <div className={cx('menu-body')}>{renderItems()}</div>

                    {items.length > 0 ? (
                        <div>
                            <p className={cx('amount')}>
                                <strong className={cx('amount-title')}>TỔNG SỐ PHỤ:</strong>
                                <strong className={cx('amount-price')}>
                                    {handleFormatPrice(handleCalTotalPrice(items))} đ
                                </strong>
                            </p>
                            <Link className={cx('ToCartButton')} to="/cart">
                                <div className={cx('ToCartButtonTitle')}>XEM GIỎ HÀNG</div>
                            </Link>
                            <Link className={cx('ToPaymentButton')} to="/payment">
                                <div className={cx('ToPaymentButtonTitle')}>THANH TOÁN</div>
                            </Link>
                        </div>
                    ) : (
                        <div className={cx('empty-title')}>Chưa có sản phẩm trong giỏ hàng</div>
                    )}
                </CartPopper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive offset={[12, 8]} placement="bottom-end" hideOnClick={hideOnClick} render={renderResult}>
                {children}
            </Tippy>
        </div>
    );
}

export default CartMenu;
