CREATE OR REPLACE FUNCTION actualizar_inventario_producto()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT cantidad FROM productos_producto WHERE id = NEW.producto_id) 
	< NEW.cantidad THEN
        RAISE EXCEPTION 'No hay suficiente cantidad en inventario para el 
		producto con ID %', NEW.id_producto;
    END IF;

    UPDATE productos_producto
    SET cantidad = cantidad - NEW.cantidad
    WHERE id = NEW.producto_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER restar_inventario_al_vender
AFTER INSERT ON ventas_itemproducto
FOR EACH ROW
EXECUTE FUNCTION actualizar_inventario_producto();

