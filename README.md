# Currency Converter

Currency Converter is a REST API that only has one POST method, that converts a value to one currency to another.

## Installation
Inside the project, just do:
```bash
npm install
```

## Usage
It's a straight forward POST request, with parameters:
 - "Value": The value to be converted;
 - "From": The currency you want to convert from; 
 - "To": The currency you want to convert to;

Example:
```bash
curl --location --request POST 'http://localhost:6060/posts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value": 10,
    "to": "USD",
    "from": "EUR"
}'
```

This uses [Open Exchange Rates](https://openexchangerates.org/) as requested, but unfortunately I couldn't use their API for conversion, as this seems to be a paid feature, based on the return that I got:
```json
{
    "error": true,
    "status": 403,
    "message": "not_allowed",
    "description": "Single-currency Conversion API not available with this App ID - please contact support@openexchangerates.org to upgrade your account."
}
```

The problem stopped my development halfway, as this was the critical part of the task.