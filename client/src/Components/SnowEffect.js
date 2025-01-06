import React, { useEffect } from 'react';
import './SnowEffect.css';

const SnowEffect = () => {
  useEffect(() => {
    let snowflakes = [];
    const EFFECT_RADIUS = 20; // Mouse'un etki yarıçapı

    const createSnowflakeAtPosition = (x, y) => {
      for (let i = 0; i < 10; i++) { // Her tıklamada 10 kar tanesi
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Tıklayınca rastgele kar tanesi olustur
        const randomOffset = () => (Math.random() - 0.5) * 200;
        snowflake.style.left = (x + randomOffset()) + 'px';
        snowflake.style.top = (y + randomOffset()) + 'px';
        
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px';
        
        snowflakes.push(snowflake);
        document.querySelector('.snow-container').appendChild(snowflake);
        
        setTimeout(() => {
          if (snowflakes.includes(snowflake)) {
            snowflake.remove();
            snowflakes = snowflakes.filter(s => s !== snowflake);
          }
        }, parseFloat(snowflake.style.animationDuration) * 1000);
      }
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      snowflakes.forEach(snowflake => {
        const rect = snowflake.getBoundingClientRect();
        const snowflakeX = rect.left + rect.width / 2;
        const snowflakeY = rect.top + rect.height / 2;

        const distanceX = clientX - snowflakeX;
        const distanceY = clientY - snowflakeY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < EFFECT_RADIUS) {
          snowflake.style.opacity = '0';
          snowflake.style.transform = 'scale(0)';
          
          setTimeout(() => {
            snowflake.remove();
            snowflakes = snowflakes.filter(s => s !== snowflake);
          }, 200);
        }
      });
    };

    const handleClick = (e) => {
      const { clientX, clientY } = e;
      createSnowflakeAtPosition(clientX, clientY);
    };

    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random() * 0.7 + 0.3;
      snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px';
      
      snowflakes.push(snowflake);
      document.querySelector('.snow-container').appendChild(snowflake);
      
      setTimeout(() => {
        if (snowflakes.includes(snowflake)) {
          snowflake.remove();
          snowflakes = snowflakes.filter(s => s !== snowflake);
        }
      }, parseFloat(snowflake.style.animationDuration) * 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    const snowInterval = setInterval(createSnowflake, 150);

    return () => {
      clearInterval(snowInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      snowflakes.forEach(snowflake => snowflake.remove());
    };
  }, []);

  return <div className="snow-container" />;
};

export default SnowEffect; 