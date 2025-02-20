// Define the suggestion class matching SuggestionDto
class ThreadSuggestion {
  title string @description("Short title or summary of the suggestion")
  detailedSuggestion string @description("Detailed explanation of the suggestion")
}

// Function to generate suggestions based on thread content and available tools
function GenerateThreadSuggestions(
    thread: string, 
    components: string,
    maxSuggestions: int
    ) -> ThreadSuggestion[] {
  client CustomGPT4oMini
  prompt #"
    You are a helpful assistant that generates user suggestions.

    You are helping them think of next actions they could take with the app.

    Given this conversation thread:
    {{ thread }}

    Generate {{ maxSuggestions }} suggestions.

    Each suggestion should:
    Be relevant to the conversation context
    Help the user understand other relevant features in the app.
    Be specific and actionable WITHIN THE APP ONLY
    DO NOT suggest actions outside the tools available

    Format each suggestion as a short command-like action:
    Title: A Title for the command.
    Detail: A command-like description of the suggestion.
    
    Examples of good suggestions:
    Title: Teslas Stock Price
    Detail: Display the current price of Tesla stock.
    Title: Send Email to John
    Detail: Draft an email to John Doe based on infor above.

    Examples of bad suggestions:
    Title: Plan Your Run (too vague, not a specific app action)
    Title: Bring Umbrella (not an in-app action)

    The suggestions should be direct commands that use the available tools:

    Here are tools that the app can use to help the user:
    {{ components }}

    Think step by step and reason through the suggestions.
    {{ ctx.output_format }}
  "#
}

// Test the function
test generate_thread_suggestions {
  functions [GenerateThreadSuggestions]
  args {
    thread "User: What's the weather like in London today?\nAssistant: Let me check the current weather conditions for London.\nUser: Also, I'm concerned about air quality since I plan to go running.\nAssistant: I'll check both the weather forecast and air quality data for London to help you plan your run."
    components "WeatherDay(weather data display) AirQuality(air quality display) getWeatherForecast(forecast) getHistoricalWeather(history) getAirQuality(aqi)"
    maxSuggestions 3
  }
}


test generic_thread {
  functions [GenerateThreadSuggestions]
  args {
    thread "User: test"
    components "WeatherDay(weather data display) AirQuality(air quality display) getWeatherForecast(forecast) getHistoricalWeather(history) getAirQuality(aqi)"
    maxSuggestions 3
  }
}

test thread_with_weather {
  functions [GenerateThreadSuggestions]
  args {
    thread "User: test\nAssistant: I appreciate your suggestion! If you have any specific questions about my features or limitations, feel free to ask. I can assist with weather information and air quality data.\nUser: Show me the current weather\nAssistant: I see the current weather in Harbour Island, Bahamas: It's 23.7°C (74.7°F) and Clear, with 91% humidity and wind speed of 22.7 km/h from the South. The air quality is good with an EPA index of 1."
    components "WeatherDay(weather data display) AirQuality(air quality display) getWeatherForecast(forecast) getHistoricalWeather(history) getAirQuality(aqi)"
    maxSuggestions 3
  }
}
