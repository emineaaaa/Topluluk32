import React, { useState } from 'react';

const Footer = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                   Footer
                </p>
            </div>
        </footer>
    );
};

export default Footer;
