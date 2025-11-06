// Google Maps utilities for removing development watermarks
// ⚠️ WARNING: Use only for development - violates Google Maps ToS in production

export const removeGoogleMapsWatermark = () => {
  // Function to hide development watermarks
  const hideWatermarks = () => {
    // Hide "For development purposes only" text
    const watermarkElements = document.querySelectorAll(
      '.gm-style-cc, .gmnoprint, [title="Keyboard shortcuts"]'
    );
    
    watermarkElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.display = 'none';
      }
    });

    // Hide specific development watermark text
    const divElements = document.querySelectorAll('.gm-style div');
    divElements.forEach(div => {
      if (div.textContent?.includes('For development purposes only')) {
        (div as HTMLElement).style.display = 'none';
      }
    });

    // Hide Google logo and terms
    const ccElements = document.querySelectorAll('.gm-style-cc > div');
    ccElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.display = 'none';
      }
    });
  };

  // Run immediately
  hideWatermarks();

  // Run after a delay to catch dynamically loaded elements
  setTimeout(hideWatermarks, 1000);
  setTimeout(hideWatermarks, 3000);

  // Set up observer for dynamic content
  const observer = new MutationObserver(() => {
    hideWatermarks();
  });

  // Observe the document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
};

// Function to check if maps is in development mode
export const isGoogleMapsDevelopmentMode = (): boolean => {
  return document.querySelector('.gm-style-cc')?.textContent?.includes('For development purposes only') || false;
};

// Function to setup proper Google Maps for production
export const getGoogleMapsConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
  }

  return {
    apiKey: apiKey || '',
    libraries: ['places', 'geometry'],
    version: 'weekly',
    // Add production-specific config
    ...(isProduction && {
      // Production specific configurations
      region: 'ID', // Set to Indonesia
      language: 'id', // Set to Indonesian
    })
  };
};
