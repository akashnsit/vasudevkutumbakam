# Banyan Tree Pollution Monitor

A web-based visualization that displays a banyan tree with leaves that change color based on global pollution levels. The application uses HTML, CSS, JavaScript, and p5.js to create an elegant, full-screen view of Earth's health through the metaphor of a living tree.

## Features

- **Real-time Visualization**: Leaves on the banyan tree change color based on pollution levels:
  - Green when Earth's greenery is coping well
  - Brown when pollution overwhelms natural capacity
  - Mixed colors during transition states

- **Pollution Data Display**: Shows formatted pollution data for:
  - PM2.5
  - PM10
  - NO₂
  - SO₂
  - CO
  - O₃

- **Earth's Mitigation Rate**: Displays a calculated mitigation rate based on PM2.5 levels

- **Auto-refresh**: Data and visualization update every minute

- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Technical Implementation

- **Frontend**: HTML, CSS, and JavaScript
- **Visualization**: p5.js for canvas rendering and animation
- **Data Source**: Uses mock data that simulates real pollution values (can be replaced with actual API data)
- **CORS Handling**: Includes configuration for using a CORS proxy when connecting to real APIs

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling for the application
- `script.js` - Main JavaScript code for data handling and visualization
- `mock-data.js` - Mock pollution data for demonstration
- `banyan.jpg` - Banyan tree image used in the visualization

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/banyan-pollution-monitor.git
   cd banyan-pollution-monitor
   ```

2. Open the project in a local web server:
   ```
   # Using Python's built-in server
   python -m http.server
   ```

3. Access the application in your browser:
   ```
   http://localhost:8000
   ```

## Deployment

### GitHub Pages

1. Push the code to a GitHub repository
2. Enable GitHub Pages in the repository settings
3. Select the branch you want to deploy (usually `main` or `master`)
4. The site will be available at `https://yourusername.github.io/banyan-pollution-monitor/`

### Other Hosting Options

The application consists of static files only, so it can be hosted on any web server or static site hosting service.

## Connecting to Real API Data

To use real pollution data from the OpenAQ API (v3):

1. Sign up for an API key at [https://explore.openaq.org](https://explore.openaq.org)
2. Update the `fetchPollutionData` function in `script.js` to use the OpenAQ API v3 endpoints
3. Include your API key in the request headers as shown in the OpenAQ documentation

Example code for using the real API:

```javascript
async function fetchPollutionData() {
    try {
        const response = await fetch('https://api.openaq.org/v3/measurements?limit=100&page=1&sort=desc&has_geo=true&parameter=pm25&parameter=pm10&parameter=no2&parameter=so2&parameter=co&parameter=o3', {
            headers: {
                'X-API-Key': 'YOUR-OPENAQ-API-KEY'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process the data...
        
    } catch (error) {
        console.error('Error fetching pollution data:', error);
        // Handle error...
    }
}
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Banyan tree image: [Source credit]
- OpenAQ API: [https://openaq.org](https://openaq.org)
- p5.js: [https://p5js.org](https://p5js.org)

