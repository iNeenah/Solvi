// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolviTest {
    struct Prestamo {
        uint256 id;
        uint256 monto;
        address prestatario;
        address prestamista;
        bool financiado;
        bool activo;
    }
    
    mapping(uint256 => Prestamo) public prestamos;
    uint256 public contadorPrestamos;
    
    event PrestamoSolicitado(uint256 id, address indexed prestatario, uint256 monto);
    event PrestamoFinanciado(uint256 id, address indexed prestamista, address indexed prestatario);
    
    function solicitarPrestamo(uint256 _monto) external {
        require(_monto > 0, "El monto debe ser mayor a 0");
        require(_monto >= 1000000000000000, "Monto minimo: 0.001 MATIC"); // 0.001 MATIC minimum
        
        contadorPrestamos++;
        
        prestamos[contadorPrestamos] = Prestamo({
            id: contadorPrestamos,
            monto: _monto,
            prestatario: msg.sender,
            prestamista: address(0),
            financiado: false,
            activo: true
        });
        
        emit PrestamoSolicitado(contadorPrestamos, msg.sender, _monto);
    }
    
    function financiarPrestamo(uint256 _id) external payable {
        require(_id > 0 && _id <= contadorPrestamos, "ID de prestamo invalido");
        require(prestamos[_id].activo, "Prestamo no activo");
        require(!prestamos[_id].financiado, "Prestamo ya financiado");
        require(msg.value == prestamos[_id].monto, "Monto incorrecto");
        
        prestamos[_id].prestamista = msg.sender;
        prestamos[_id].financiado = true;
        
        // Transfer funds to borrower
        payable(prestamos[_id].prestatario).transfer(msg.value);
        
        emit PrestamoFinanciado(_id, msg.sender, prestamos[_id].prestatario);
    }
    
    function obtenerPrestamosActivos() external view returns (Prestamo[] memory) {
        uint256 activosCount = 0;
        
        // Count active loans
        for (uint256 i = 1; i <= contadorPrestamos; i++) {
            if (prestamos[i].activo && !prestamos[i].financiado) {
                activosCount++;
            }
        }
        
        // Create array of active loans
        Prestamo[] memory prestamosActivos = new Prestamo[](activosCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= contadorPrestamos; i++) {
            if (prestamos[i].activo && !prestamos[i].financiado) {
                prestamosActivos[index] = prestamos[i];
                index++;
            }
        }
        
        return prestamosActivos;
    }
    
    function obtenerPrestamo(uint256 _id) external view returns (Prestamo memory) {
        require(_id > 0 && _id <= contadorPrestamos, "ID de prestamo invalido");
        return prestamos[_id];
    }
    
    function obtenerContadorPrestamos() external view returns (uint256) {
        return contadorPrestamos;
    }
}