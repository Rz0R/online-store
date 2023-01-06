import { useState } from 'react';

import styles from './CopyLinkButton.module.scss';

const MSG_DELAY = 500;

function CopyLinkButton() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), MSG_DELAY);
  };

  return (
    <button className={styles.copyLinkBtn} type="button" onClick={copyUrl}>
      {isCopied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}

export default CopyLinkButton;
