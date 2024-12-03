from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
from fastapi.responses import JSONResponse

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

def scrape_jobs(keyword):
    url = f"https://wellfound.com/role/{keyword.replace(' ', '-')}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = []

    job_listings = soup.find_all('div', class_='job-listing')  

    for job in job_listings:
        title = job.find('h3').text.strip() if job.find('h3') else "No title"
        company = job.find('span', class_='company-name').text.strip() if job.find('span', class_='company-name') else "No company"
        location = job.find('span', class_='location').text.strip() if job.find('span', class_='location') else "No location"
        jobs.append({'title': title, 'company': company, 'location': location})

    print("Scraped Jobs:", jobs)  
    return jobs

@app.get("/jobs/{keyword}")
def get_jobs(keyword: str):
    jobs = scrape_jobs(keyword)
    return JSONResponse(content=jobs)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)