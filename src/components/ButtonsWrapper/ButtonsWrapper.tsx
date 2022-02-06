import './ButtonsWrapper.scss';

function ButtonsWrapper (props: any) : JSX.Element {
  return (
    <div className="ButtonsWrapper">
       {props.children}
    </div>
  );
}

export default ButtonsWrapper;
