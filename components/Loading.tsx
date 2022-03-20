interface LoadingProps {
  box: boolean
}

const Loading = ({ box = false }) => (
  <>
    <div className={box ? 'loading loading--box' : 'loading'}>
      <div className="spinner"></div>
      <p className="text" role="alert">
        Loading...
      </p>
    </div>
    <style jsx>{`
      .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        text-align: center;
      }

      .loading--box {
        height: 300px;
        border: 2px solid var(--secondary-color);
      }

      @keyframes spinner {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .spinner {
        width: 5rem;
        height: 5rem;
        border: 0.5rem solid var(--secondary-color);
        border-right-color: var(--active-color);
        border-radius: 50%;
        animation: spinner 0.75s linear infinite;
      }

      .text {
        margin-top: 0.75rem;
        font-size: 1.75rem;
      }
    `}</style>
  </>
)

export default Loading
