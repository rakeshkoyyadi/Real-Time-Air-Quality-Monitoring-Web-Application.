
const API_KEY = '0b658e4c5dbb894ac6b4a96298327f2f';

document.getElementById('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const lat = parseFloat(document.getElementById('latitude').value);
  const lon = parseFloat(document.getElementById('longitude').value);
  const resultDiv = document.getElementById('result');
  const title = resultDiv.querySelector('.info-title');

  if (isNaN(lat) || isNaN(lon)) {
    alert('Please enter valid numbers for latitude and longitude.');
    return;
  }

 
  resultDiv.style.display = 'flex';
  title.textContent = 'Loading…';

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();

    if (!data.list || data.list.length === 0) {
      throw new Error('No air quality data found for these coordinates.');
    }

    const { aqi } = data.list[0].main;
    const comps = data.list[0].components;

    document.getElementById('aqi').textContent = aqi;
    document.getElementById('co').textContent = comps.co;
    document.getElementById('no2').textContent = comps.no2;
    document.getElementById('o3').textContent = comps.o3;
    document.getElementById('pm2').textContent = comps.pm2_5;
    document.getElementById('pm10').textContent = comps.pm10;
    document.getElementById('so2').textContent = comps.so2;

    title.textContent = `Air Quality at ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  } catch (err) {
    console.error(err);
    title.textContent = 'Error';
    resultDiv.querySelectorAll('.info-data').forEach(el => el.textContent = '');
    resultDiv.innerHTML += `<p class="info-data" style="color:red;">${err.message}</p>`;
  }
});
