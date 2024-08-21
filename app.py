from flask import Flask, request, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form.get('url')

        if not url:
            return render_template('index.html', error='No URL provided.')

        try:
            # Bypass the link using the bypass.vip API
            api_url = f"https://api.bypass.vip/bypass?url={url}"
            response = requests.get(api_url)

            # Check for a successful response
            if response.status_code == 200:
                data = response.json()
                if data['status'] == 'success':
                    result = data['result']
                    return render_template('index.html', result=result)
                else:
                    return render_template('index.html', error='Failed to bypass the link.')
            else:
                return render_template('index.html', error=f'Failed to retrieve the original link. Status code: {response.status_code}')
        
        except Exception as e:
            return render_template('index.html', error=f'An error occurred: {str(e)}')

    return render_template('index.html')

if __name__ == "__main__":
    app.run()
