export default function QuantitySelector({ quantity, onDecrease, onIncrease, size = 'sm' }) {
  const btnSize = size === 'md' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'md' ? 'w-12 text-lg' : 'w-10';

  return (
    <div className="flex items-center bg-surface-container-high rounded-xl p-1 inline-flex">
      <button 
        onClick={onDecrease}
        className={`${btnSize} flex items-center justify-center text-on-surface hover:bg-surface-variant rounded-lg transition-colors font-bold`}
      >
        -
      </button>
      <span className={`${textSize} text-center font-bold`}>{quantity}</span>
      <button 
        onClick={onIncrease}
        className={`${btnSize} flex items-center justify-center text-on-surface hover:bg-surface-variant rounded-lg transition-colors font-bold`}
      >
        +
      </button>
    </div>
  );
}
