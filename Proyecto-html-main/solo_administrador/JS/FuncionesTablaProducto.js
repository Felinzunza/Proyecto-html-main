



    const filas = document.querySelectorAll("table tr");

    filas.forEach(fila => {
      const celdaStockActual = fila.querySelector(".stock-actual");
      const celdaStockCritico = fila.querySelector(".stock-critico");

      if (celdaStockActual && celdaStockCritico) {
        const stockActual = parseInt(celdaStockActual.textContent);
        const stockCritico = parseInt(celdaStockCritico.textContent);

        if (stockActual < stockCritico) {
          celdaStockActual.textContent = `${stockActual} 🚨Bajo stock`;
          celdaStockActual.classList.add("alerta");
        }
      }
    });
  ;