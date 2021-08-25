package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Kredit;
import rva.repository.KreditRepository;

@CrossOrigin
@RestController
@Api(tags = {"Kredit CRUD operacije"})
public class KreditRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KreditRepository kreditRepository;
	
	@GetMapping("kredit")
	@ApiOperation(value = "Vraća kolekciju svih Kredita iz baze podataka")
	public Collection<Kredit> getKrediti(){
		return kreditRepository.findAll();
	}
	
	@GetMapping("kredit/{id}")
	@ApiOperation(value = "Vraća Kredit iz baze podataka čija je vrednost prosleđena kao path varijabla")
	public Kredit getKredit(@PathVariable Integer id) {
		return kreditRepository.getOne(id);
	}
	
	@GetMapping("kreditNaziv/{naziv}")
	@ApiOperation(value = "Vraća Klijenta iz baze podataka čija je naziv vrednost prosleđena kao path varijabla")
	public Collection<Kredit> getKreditByNaziv(@PathVariable String naziv){
		return kreditRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("kredit")
	@ApiOperation(value = "Upisuje Kredit u bazu podataka")
	public ResponseEntity<Kredit> insertKredit(@RequestBody Kredit kredit){
		if(!kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("kredit")
	@ApiOperation(value = "Modifikuje postojeći Kredit u bazi podataka")
	public ResponseEntity<Kredit> updateKredit(@RequestBody Kredit kredit){
		if(!kreditRepository.existsById(kredit.getId())) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		kreditRepository.save(kredit);
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
	
	@DeleteMapping("kredit/{id}")
	@ApiOperation(value = "Briše Kredit iz baze podataka")
	public ResponseEntity<Kredit> deleteKredit(@PathVariable Integer id){
		if(!kreditRepository.existsById(id)) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		kreditRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute("insert into \"kredit\" (\"id\", \"naziv\", \"oznaka\", \"opis\") "
					+ "values (-100, 'Test racun', 'Test oznaka','Test opis')");
		}
		return new ResponseEntity<Kredit>(HttpStatus.OK);
		
	}

}
