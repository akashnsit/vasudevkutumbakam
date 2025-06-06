// Mock pollution data for demonstration purposes
const mockPollutionData = {
    pm25: {
        value: 18.5,
        unit: "µg/m³"
    },
    pm10: {
        value: 42.3,
        unit: "µg/m³"
    },
    no2: {
        value: 15.7,
        unit: "µg/m³"
    },
    so2: {
        value: 3.2,
        unit: "µg/m³"
    },
    co: {
        value: 0.8,
        unit: "mg/m³"
    },
    o3: {
        value: 68.1,
        unit: "µg/m³"
    }
};

// Function to get random variation of the mock data
function getMockDataWithVariation() {
    const variation = 0.2; // 20% variation
    
    return {
        pm25: {
            value: mockPollutionData.pm25.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.pm25.unit
        },
        pm10: {
            value: mockPollutionData.pm10.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.pm10.unit
        },
        no2: {
            value: mockPollutionData.no2.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.no2.unit
        },
        so2: {
            value: mockPollutionData.so2.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.so2.unit
        },
        co: {
            value: mockPollutionData.co.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.co.unit
        },
        o3: {
            value: mockPollutionData.o3.value * (1 + (Math.random() * variation * 2 - variation)),
            unit: mockPollutionData.o3.unit
        }
    };
}

